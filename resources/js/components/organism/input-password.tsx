import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
    ({ className, ...props }, ref) => {
        const [visible, setVisible] = React.useState(false);

        return (
            <div className="relative">
                <Input
                    ref={ref}
                    type={visible ? "text" : "password"}
                    className={className + " pr-10"}
                    {...props}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                    onClick={() => setVisible((v) => !v)}
                >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
            </div>
        );
    }
);

InputPassword.displayName = "InputPassword";
