interface Props {
    title: string;
    value: string;
}
export const OrderItem = ({title, value}:Props) => {
  return (
        <div className='flex flex-row justify-between pb-3'>
            <span className='text-sm'>{title}</span>
            <span className='text-sm'>{value}</span>
        </div>
    )
}
