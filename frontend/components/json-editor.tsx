"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { init } from "next/dist/compiled/webpack/webpack";

interface JsonEditorProps {
    initialData?: Object
    onChange: (json: Object) => void
}

export function JsonEditor({
    initialData,
    onChange
}: JsonEditorProps) {
    const [isInitialized, setIsInitialized] = useState(false);
    const editorRef = useRef<any>(null);

    useEffect(() => {
        if (!editorRef.current) {
            return;
        }
        setIsInitialized(true)
        if (isInitialized) return;
        const initEditor = async() => {
            const JSONEditor: any = await import("jsoneditor")
            const editor = new JSONEditor.default(editorRef.current, {})
            editorRef.current.jsonEditor = editor;

            
            editorRef.current.jsonEditor.options.onChange = () => {
                const updatedJsonData = editorRef.current.jsonEditor.get();
                onChange(updatedJsonData)
            }
            
            editor.set(initialData)

            if (editorRef.current.children.length > 1) {
                editorRef.current.removeChild(editorRef.current.children[0]) // React Strict Fix
            }

            return () => {
                editor.destroy();
            }
        }
        initEditor()

    }, [])

    return (
        <div>
            <meta charSet="utf-8" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/10.0.2/jsoneditor.min.css" rel="stylesheet" type="text/css" />
            <div ref={editorRef} style={{ width: '100%', height: '100%' }}></div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/10.0.2/jsoneditor.min.js"></script>
        </div>
    )
}