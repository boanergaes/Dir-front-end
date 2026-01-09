import { useContext, useMemo, useState } from 'react';
import { Pencil } from "lucide-react";
import Button from "../../../common-components/button";
import { ProfileContext } from '../../../context/ProfileContext/ProfileContext';
import { useProfileApi } from '../../../hooks/useProfileApi';

export default function Sidebar() {
  const { profile } = useContext(ProfileContext);
  const { updatePreferences, loading } = useProfileApi();
  const [status, setStatus] = useState('');

  const preferences = useMemo(() => profile?.preferences || {}, [profile]);

  const handleNotificationChange = async (value) => {
    setStatus('');
    try {
      await updatePreferences({
        ...preferences,
        notificationsEnabled: value === 'on'
      });
      setStatus('Preferences updated');
    } catch (err) {
      setStatus(err.message || 'Unable to update preferences');
    }
  };

  const handleThemeChange = async (value) => {
    setStatus('');
    try {
      await updatePreferences({
        ...preferences,
        theme: value
      });
      setStatus('Preferences updated');
    } catch (err) {
      setStatus(err.message || 'Unable to update preferences');
    }
  };

  return (
    <>
      <div className="relative max-w-xs">
        <img
          className="w-64 h-64 rounded-full"
          src={profile?.avatarUrl || "https://comebackapp.net/wp-content/uploads/2018/12/portrait-square-04.jpg"}
          alt="profilepic"
        />
        <Button
          className={
            "rounded-md py-2 absolute top-2 right-4 px-4 flex justify-center items-center gap-3"
          }
        >
          <Pencil size={20} />
          <span className="font-normal">Edit</span>
        </Button>
      </div>
      <div>
        <h3 className="font-semibold text-2xl text-(--primary-text-color)">
          Preferences
        </h3>
        <hr className="border border-(--main-border-color) my-2 max-w-xs" />
        <div>
          <p className="font-semibold text-xl my-2 text-(--primary-text-color)">
            Notification
          </p>
          <div className="flex gap-1 items-center mb-1.5 text-(--secondary-text-color)">
            <input
              type="radio"
              name="notification"
              id="notOn"
              value={"on"}
              checked={preferences.notificationsEnabled === true}
              onChange={() => handleNotificationChange('on')}
              disabled={loading}
            />
            <label htmlFor="notOn">On</label>
          </div>
          <div className="flex gap-1 items-center mb-1.5 text-(--secondary-text-color)">
            <input
              type="radio"
              name="notification"
              id="notOff"
              value={"off"}
              checked={preferences.notificationsEnabled === false}
              onChange={() => handleNotificationChange('off')}
              disabled={loading}
            />
            <label htmlFor="notOff">Off</label>
          </div>
        </div>
        <div>
          <p className="font-semibold text-xl my-2 text-(--primary-text-color)">
            Theme
          </p>
          <div className="flex gap-1 items-center mb-1.5 text-(--secondary-text-color)">
            <input
              type="radio"
              name="theme"
              id="light"
              value={"light"}
              checked={preferences.theme === 'light'}
              onChange={() => handleThemeChange('light')}
              disabled={loading}
            />
            <label htmlFor="light">light mode</label>
          </div>
          <div className="flex gap-1 items-center mb-1.5 text-(--secondary-text-color)">
            <input
              type="radio"
              name="theme"
              id="night"
              value={"night"}
              checked={preferences.theme === 'dark' || preferences.theme === 'night'}
              onChange={() => handleThemeChange('dark')}
              disabled={loading}
            />
            <label htmlFor="night">night mode</label>
          </div>
        </div>
        {status && (
          <p className="text-sm mt-2" style={{ color: 'var(--secondary-text-color)' }}>
            {status}
          </p>
        )}
      </div>
    </>
  );
}
