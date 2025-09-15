import { CodeComparison } from "@/registry/magicui/code-comparison";

const beforeCode = `import { NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  let user = undefined;
  let team = undefined;
  const token = req.headers.get('token'); 

  if(req.nextUrl.pathname.startsWith('/auth')) {
    user = await getUserByToken(token);

    if(!user) {
      return NextResponse.redirect('/login');
    }
  }

  if(req.nextUrl.pathname.startsWith('/team')) {
    user = await getUserByToken(token);

    if(!user) {
      return NextResponse.redirect('/login');
    }

    const slug = req.nextUrl.query.slug;
    team = await getTeamBySlug(slug); // [!code highlight]

    if(!team) { // [!code highlight]
      return NextResponse.redirect('/'); // [!code highlight]
    } // [!code highlight]
  } // [!code highlight]

  return NextResponse.next(); // [!code highlight]
}

export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'], // [!code highlight]
};`;

const afterCode = `import { createMiddleware, type MiddlewareFunctionProps } from '@app/(auth)/auth/_middleware';
import { auth } from '@/app/(auth)/auth/_middleware'; // [!code --]
import { auth } from '@/app/(auth)/auth/_middleware'; // [!code ++]
import { team } from '@/app/(team)/team/_middleware';

const middlewares = {
  '/auth{/:path?}': auth,
  '/team{/:slug?}': [ auth, team ],
};

export const middleware = createMiddleware(middlewares); // [!code focus]

export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};`;

export default function CodeComparisonDemo() {
  return (
    <CodeComparison
      beforeCode={beforeCode}
      afterCode={afterCode}
      language="typescript"
      filename="middleware.ts"
      lightTheme="github-light"
      darkTheme="github-dark"
      highlightColor="rgba(101, 117, 133, 0.16)"
    />
  );
}
