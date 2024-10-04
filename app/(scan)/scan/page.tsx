"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BrowserMultiFormatReader, Result } from "@zxing/library";
import { FiX } from "react-icons/fi";

const updateNewData = <T,>(prevData: T, newData: T) =>
  prevData === newData ? prevData : newData;

const codeReader = new BrowserMultiFormatReader();

export default function ScanPage() {
  const [videoDeviceList, setVideoDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    /** 바코드리더 초기 로드시, 사용가능한 카메라 목록을 가져옵니다. */
    const loadVideoInputDeviceList = async () => {
      let videoDeviceList: MediaDeviceInfo[] = [];
      try {
        videoDeviceList = await codeReader.listVideoInputDevices();
      } catch (error) {
        console.error(error);
      }
      setVideoDeviceList((prev) => updateNewData(prev, videoDeviceList));
    };
    loadVideoInputDeviceList();
    return () => codeReader.reset();
  }, []);

  useEffect(() => {
    /** 바코드리더 초기 로드시 & 목록 변화시, 사용가능한 카메라 목록중 하나를 디폴트로 선택합니다. */
    if (videoDeviceList.length) {
      // 후면 카메라를 찾아 우선적으로 선택
      const rearCamera = videoDeviceList.find((device) =>
        /(back|rear)/i.test(device.label)
      );
      const deviceToUse = rearCamera || videoDeviceList[0];
      setSelectedDeviceId((prev) => updateNewData(prev, deviceToUse.deviceId));
    }
  }, [videoDeviceList]);

  useEffect(() => {
    /** 디바이스ID로 스트림을 받아옵니다. */
    if (selectedDeviceId !== "" && videoRef.current) {
      const setMedia = async (htmlVideoElement: HTMLVideoElement) => {
        codeReader.reset(); /* 기존 연결 해제 */
        const constraints = {
          video: {
            deviceId: { exact: selectedDeviceId },
            facingMode: { ideal: "environment" }, // 후면 카메라 선호
          },
        };
        let newVideoStream: MediaStream | null = null;
        try {
          /** 디바이스 목록엔 떴지만 사용불가시 throw */
          newVideoStream = await navigator.mediaDevices.getUserMedia(
            constraints
          );
        } catch (error) {
          console.error(error);
        } finally {
          htmlVideoElement.srcObject = newVideoStream;
          htmlVideoElement.autoplay = true;
        }
        if (newVideoStream) {
          /** 연결된 디바이스에 콜백함수를 전달해줍니다. */
          codeReader.decodeFromVideoElementContinuously(
            htmlVideoElement,
            (result: Result) =>
              result && router.push(`/search?query=${result.getText()}`)
          );
        } else {
          /** 사용 불가능한 디바이스는 선택지에서 제거합니다. */
          alert(`해당 디바이스는 사용할 수 없습니다. (${selectedDeviceId})`);
          setVideoDeviceList((prev) =>
            prev.filter((prev) => prev.deviceId !== selectedDeviceId)
          );
        }
      };
      setMedia(videoRef.current);
    }
  }, [selectedDeviceId]);

  const handleClose = () => {
    router.back();
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full relative p-4'>
      <button
        className='absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-10'
        onClick={handleClose}
      >
        <FiX className='text-2xl sm:text-3xl text-primary' />
      </button>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6 md:mb-8'>
        ISBN 스캐너
      </h1>
      <div className='w-full max-w-screen-lg'>
        <video
          ref={videoRef}
          className='w-full h-full object-cover rounded-3xl shadow-lg'
          playsInline
          autoPlay
          muted
        />
      </div>
      <p className='text-sm sm:text-base md:text-lg text-primary mt-4 sm:mt-6 md:mt-8 text-center'>
        책의 ISBN 바코드를 카메라에 비춰주세요.
      </p>
    </div>
  );
}
