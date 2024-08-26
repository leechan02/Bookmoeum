interface BookDetailParams {
  params: { id: string };
}

export default function BookDetail({ params }: BookDetailParams) {
  const id = params.id;
  return <div className='h-screen'>Book isbn13: {id}</div>;
}
