import UserLevelBadge from '../UserLevelBadge';

export default function UserLevelBadgeExample() {
  return (
    <div className="flex gap-3 items-center">
      <UserLevelBadge level={3} />
      <UserLevelBadge level={15} compact />
    </div>
  );
}
