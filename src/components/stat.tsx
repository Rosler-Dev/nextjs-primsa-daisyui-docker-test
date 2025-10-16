interface StatProps {
  title: string
  value: string | number
}

export default function Stat({ title, value }: StatProps) {
  return (
    <div className="stat place-items-center">
      <div className="stat-title">{title}</div>
      <div className="stat-value text-2xl sm:text-3xl">{value}</div>
    </div>
  )
}
