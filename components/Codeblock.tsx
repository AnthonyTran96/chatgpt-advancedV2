'use client';
import { FC, memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { CodeBlockProps, languageMap } from '@/lib/types';

export const programmingLanguages: languageMap = {
    javascript: '.js',
    python: '.py',
    java: '.java',
    c: '.c',
    cpp: '.cpp',
    'c++': '.cpp',
    'c#': '.cs',
    ruby: '.rb',
    php: '.php',
    swift: '.swift',
    'objective-c': '.m',
    kotlin: '.kt',
    typescript: '.ts',
    go: '.go',
    perl: '.pl',
    rust: '.rs',
    scala: '.scala',
    haskell: '.hs',
    lua: '.lua',
    shell: '.sh',
    sql: '.sql',
    html: '.html',
    css: '.css',
    // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

export const generateRandomString = (length: number, lowercase = false) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'; // excluding similar looking characters like Z, 2, I, 1, O, 0
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return lowercase ? result.toLowerCase() : result;
};

const CodeBlock: FC<CodeBlockProps> = memo(({ language, value }) => {
    return (
        <div className="codeblock w-full bg-zinc-950 font-sans rounded-md mt-5 mb-7 overflow-x-auto">
            <div className="flex w-full items-center justify-between bg-zinc-800 px-6 py-2 pr-4 text-zinc-100 rounded-t-md">
                <span className="text-xs lowercase">{language}</span>
            </div>
            <SyntaxHighlighter
                language={language}
                style={coldarkDark}
                PreTag="div"
                customStyle={{
                    margin: 0,
                    width: '100%',
                    background: 'transparent',
                    padding: '1rem 1rem',
                }}
                codeTagProps={{
                    style: {
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-mono)',
                    },
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
});
CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
