import Image from "next/image";
import Link from "next/link";

export interface AuthorProps {
  _id: string;
  title: string;
  twitter: string;
  avatar: string;
}

const Author = ({ author }: { author: AuthorProps }) => (
  <div className="mt-4 flex space-x-4">
    <Link
      key={author._id}
      href={`https://twitter.com/${author.twitter}`}
      className="flex items-center space-x-2 text-sm"
    >
      <Image
        src={author.avatar}
        alt={author.title}
        width={42}
        height={42}
        className="rounded-full bg-white"
      />
      <div className="flex-1 text-left leading-tight">
        <p className="font-medium">{author.title}</p>
        <p className="text-[12px] text-muted-foreground">@{author.twitter}</p>
      </div>
    </Link>
  </div>
);

export default Author;
