import XPProgress from '../XPProgress';

export default function XPProgressExample() {
  return (
    <div className="max-w-md">
      <XPProgress currentXP={150} requiredXP={300} level={3} />
    </div>
  );
}
