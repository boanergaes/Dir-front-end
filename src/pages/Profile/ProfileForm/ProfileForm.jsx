import { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Button from "../../../common-components/button";
import Input, { TextArea } from "../../../common-components/input";
import { ProfileContext } from "../../../context/ProfileContext/ProfileContext";
import { useProfileApi } from "../../../hooks/useProfileApi";

export default function ProfileForm() {
  const { profile } = useContext(ProfileContext);
  const { updateProfile, loading } = useProfileApi();
  const [formState, setFormState] = useState({
    name: "",
    githubHandle: "",
    bio: "",
    social: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (profile) {
      setFormState({
        name: profile.githubUsername || "",
        githubHandle: profile.profileUrl || "",
        bio: profile.bio || "",
        social: profile.social || "",
      });
    }
  }, [profile]);

  const handleChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = async () => {
    setStatus("");
    try {
      await updateProfile({
        githubUsername: formState.name,
        profileUrl: formState.githubHandle,
        bio: formState.bio,
        social: formState.social,
      });
      setStatus("Profile updated successfully");
    } catch (err) {
      setStatus(err.message || "Unable to update profile");
    }
  };

  const handleReset = () => {
    if (profile) {
      setFormState({
        name: profile.githubUsername || "",
        githubHandle: profile.profileUrl || "",
        bio: profile.bio || "",
        social: profile.social || "",
      });
    }
    setStatus("");
  };

  return (
    <>
      <Input
        label="Name"
        placeholder={"saron kiflu"}
        description={
          "Your name may appear around Dir where you contribute or are mentioned"
        }
        value={formState.name}
        onChange={handleChange("name")}
      />
      <Input
        className={"mt-2"}
        label="Github Handle"
        placeholder={"github.com/saronkiflu"}
        description={"You can see your github handle here"}
        value={formState.githubHandle}
        onChange={handleChange("githubHandle")}
      />
      <TextArea
        className={"mt-2"}
        label="Bio"
        placeholder={"growing"}
        description={
          "You can @mention othr users and organizations to link to them"
        }
        height="141px"
        value={formState.bio}
        onChange={handleChange("bio")}
      />
      <div>
        <Input
          className={"mt-2"}
          label="Social Accounts"
          placeholder={"link to social profile one"}
          description={"You can see your github handle here"}
          value={formState.social}
          onChange={handleChange("social")}
        />
        <Button
          className={
            " rounded-xl flex gap-2 py-1 px-4 justify-center items-center px-4 font-normal mt-2 "
          }
          variant="base"
        >
          <Plus size={16} />
          <span>Add</span>
        </Button>
      </div>
      {status && (
        <p
          className="text-sm mt-2"
          style={{ color: "var(--secondary-text-color)" }}
        >
          {status}
        </p>
      )}
      <div className="flex gap-5 mt-5">
        <Button
          onClick={handleSave}
          disabled={loading}
          className={" rounded-xl py-2 px-16"}
          variant="primary"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          onClick={handleReset}
          className={"rounded-xl py-2 px-16"}
          variant="base"
        >
          cancel
        </Button>
      </div>
    </>
  );
}
