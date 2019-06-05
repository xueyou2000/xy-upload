/// <reference types="quick-react-scripts" />

declare namespace React {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: "directory" | null;
    }
}