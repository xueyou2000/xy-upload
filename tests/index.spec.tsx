import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Upload } from "../src";
import Zh from "../src/local/zh";

describe("Upload", () => {
    test("render", () => {
        const wrapper = render(
            <Upload accept="image/gif, image/jpeg, image/png" name="file2">
                <button>上传</button>
            </Upload>,
        );
        const btn = wrapper.getByText(Zh.Upload.title);
        const input = btn.previousElementSibling as HTMLInputElement;

        expect(input.name).toBe("file2");
        expect(input.accept).toBe("image/gif, image/jpeg, image/png");
        expect(btn.parentElement.classList.contains("xy-upload")).toBeTruthy();
    });
});
