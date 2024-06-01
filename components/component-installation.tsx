"use client";

import * as React from "react";

interface ComponentInstallationProps extends React.HTMLAttributes<HTMLDivElement> {
  
}

export function ComponentInstallation({
  children,
  className,
  ...props
}: ComponentInstallationProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-8 sm:gap-6">
        <a className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10" href="/docs/installation/next">
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="currentColor">
                <title>Next.js</title>
                <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"></path>
            </svg>
            <p className="font-medium mt-2">Next.js</p>
        </a>
        
        <a className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10" href="/docs/installation/vue">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 ml-2" viewBox="0 0 18 8">
                <title>Vue.js</title>
                <path fill="currentColor" d="M2.717 1H.5a.5.5 0 0 0-.432.752l7 12a.5.5 0 0 0 .864 0l7-12A.5.5 0 0 0 14.5 1h-2.217L7.5 8.972z"/>
                <path fill="currentColor" d="M11.117 1H8.19L7.5 2.382L6.809 1H3.883L7.5 7.028z"/>
            </svg>
            <p className="font-medium">Vue.js</p>
        </a>

        <a className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10" href="/docs/installation/svelte">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 18 14">
                <title>Svelte</title>
                <path fill="currentColor" fill-rule="evenodd" d="M12.438 2.947c.584.9.645 1.875.346 2.614a4.457 4.457 0 0 0-1.903-1.077a.75.75 0 0 0-1.157-.669L8.046 4.904h-.001L5.53 6.54a.75.75 0 0 0 .817 1.258l2.516-1.635c.955-.62 2.496-.286 3.385 1.082c.888 1.368.565 2.911-.39 3.531l-5.032 3.268c-.954.62-2.496.287-3.385-1.08c-.584-.9-.644-1.876-.346-2.615c.551.52 1.211.893 1.904 1.077a.75.75 0 0 0 1.157.669L10.35 9.37a.75.75 0 0 0-.817-1.258L7.016 9.746c-.954.62-2.496.287-3.384-1.08c-.889-1.369-.566-2.913.39-3.533l5.031-3.267c.955-.62 2.496-.288 3.385 1.08m1.329 3.935c.955-1.319.904-3.252-.071-4.752C12.479.256 10.061-.577 8.236.608L3.204 3.875c-1.68 1.092-2.002 3.34-1.091 5.152c-.955 1.319-.904 3.252.07 4.752c1.218 1.874 3.636 2.707 5.46 1.522l5.032-3.268c1.68-1.091 2.002-3.339 1.092-5.151" clip-rule="evenodd"/>
            </svg>
            <p className="font-medium mt-3">Svelte</p>
        </a>
  </div>
  );
}
