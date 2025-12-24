import CodeViewer from "./CodeViewer";
import CodeViewerHeader from "./CodeViewerHeader";
import ReadMe from "./ReadMe";

export function CodeBody() {
    return (
        <div className="code-body flex flex-col gap-4 h-full">
            <CodeViewerHeader />
            <CodeViewer />
            <ReadMe />
        </div>
    )
}