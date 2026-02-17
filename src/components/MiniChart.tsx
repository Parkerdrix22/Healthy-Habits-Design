interface MiniChartProps {
  data: number[];
}

function MiniChart({ data }: MiniChartProps) {
  return (
    <div className="mini-chart">
      {data.map((value, index) => (
        <div
          key={index}
          className="mini-bar"
          style={{ height: `${Math.max(14, Math.min(100, value))}%` }}
        />
      ))}
    </div>
  );
}

export default MiniChart;
