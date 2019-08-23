/// <reference types="quick-react-scripts" />

declare namespace React {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: "directory" | null;
    }

    interface HTMLAttributes<T> extends DOMAttributes<T> {
        /**
         * Fuck 规则
         */
        name?: string;
    }
}
