import AvatarCircles from "@/registry/components/magicui/avatar-circles";

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
];

export default async function AvatarCirclesDemo() {
  return <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />;
}
