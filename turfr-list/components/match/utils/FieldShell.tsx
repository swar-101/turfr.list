import { ReactNode } from "react";

type FieldShellProps = {
    icon: ReactNode;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
};


export default function FieldShell({
                                       icon,
                                       children,
                                       className = "",
                                       contentClassName = "",
                                   }: FieldShellProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* LEFT ICON */}
            <div className="text-zinc-400">
                {icon}
            </div>

            {/* FIELD CONTAINER */}
            {/*<div*/}
            {/*    className="*/}
            {/*        flex-1*/}
            {/*        min-h-[64px]*/}
            {/*        rounded-xl*/}
            {/*        border border-white/5*/}
            {/*        bg-zinc-900*/}
            {/*        overflow-hidden*/}
            {/*    "*/}
            {/*>*/}

            <div
                className={`
                    flex-1
                    rounded-xl
                    border border-white/5
                    bg-zinc-900
                    overflow-hidden
                    ${contentClassName}
                `}
            >
                {children}
            </div>
        </div>
    );
}