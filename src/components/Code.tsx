import { Highlight, themes } from 'prism-react-renderer'

export function Code({ children }: { children: string }) {
    return (
        <Highlight theme={themes.vsDark} code={children} language="json">
            {({ tokens, getLineProps, getTokenProps }) => (
                <pre className="mt-2 overflow-x-auto rounded bg-neutral-950 p-2.5 md:p-3 text-[11px] md:text-xs text-neutral-200">
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}