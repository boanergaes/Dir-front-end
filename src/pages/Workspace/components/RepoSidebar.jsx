import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../../../../public/assets/icons/icons";
import FileTree from "./FileTree";
import SidebarToolbar from "./SidebarToolbar";

export default function RepoSidebar() {
    return (
        <div className="repo-sidebar border-r border-(--main-border-color) rounded-tr-4xl">
            <SidebarToolbar />
            <FileTree />

            <hr className="mx-6 border-b border-(--main-border-color)" />

            <a href="" target="_blank">
                <button className="flex gap-6 bg-(--primary-button) py-4 px-8 m-auto mt-6 rounded-2xl text-(--button-text-color) items-center hover:bg-(--primary-button-hover) border border-(--main-border-color) cursor-pointer transition-all">
                    <GithubIcon />
                    <span>GitHub</span>
                    <ExternalLink />
                </button>
            </a>
        </div>
    )
}