import { useRef, useState } from 'react';
import { Camera, Check, Trash2 } from 'lucide-react';
import type { Profile } from './model';

const MAX_INPUT_BYTES = 5 * 1024 * 1024;
const MAX_STORED_LENGTH = 250_000;

/** Decode locally, strip metadata, and center-crop a small raster avatar. */
export async function prepareAvatar(file: File): Promise<string> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Choose a JPEG, PNG, or WebP image.');
  }
  if (file.size > MAX_INPUT_BYTES) throw new Error('Choose an image smaller than 5 MB.');
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error('This image could not be opened. Try another JPEG, PNG, or WebP.');
  });
  try {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Image processing is unavailable in this browser.');
    const side = Math.min(bitmap.width, bitmap.height);
    context.fillStyle = '#f0f1e9';
    context.fillRect(0, 0, 256, 256);
    context.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, 256, 256);
    const result = canvas.toDataURL('image/jpeg', 0.82);
    if (result.length > MAX_STORED_LENGTH) throw new Error('This picture is too large to save. Try a simpler image.');
    return result;
  } finally {
    bitmap.close();
  }
}

export function Avatar({ profile, small = false }: { profile: Profile; small?: boolean }) {
  return <span className={`avatar${small ? ' small' : ''}`}>
    {profile.picture ? <img src={profile.picture} alt="" /> : profile.name.slice(0, 1).toUpperCase() || 'W'}
  </span>;
}

export function ProfileEditor({ profile, onSave }: {
  profile: Profile;
  onSave: (details: { picture: string; about: string }) => boolean;
}) {
  const [picture, setPicture] = useState(profile.picture || '');
  const [about, setAbout] = useState(profile.about || '');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const request = useRef(0);
  const changed = picture !== (profile.picture || '') || about !== (profile.about || '');

  async function choose(file?: File) {
    if (!file) return;
    const current = ++request.current;
    setBusy(true); setError(''); setMessage('');
    try {
      const image = await prepareAvatar(file);
      if (current === request.current) setPicture(image);
    } catch (cause) {
      if (current === request.current) setError(cause instanceof Error ? cause.message : 'Could not open this image.');
    } finally {
      if (current === request.current) setBusy(false);
    }
  }

  return <section className="panel profile-editor" aria-labelledby="profile-title">
    <div className="section-title"><div><span className="eyebrow">A LITTLE MORE YOU</span><h2 id="profile-title">Your profile</h2></div><span className="profile-private">Only in this browser</span></div>
    <div className="profile-fields">
      <div className="profile-photo">
        <Avatar profile={{ ...profile, picture }} />
        <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose profile picture" aria-describedby="picture-help" onChange={e => { void choose(e.target.files?.[0]); e.target.value = ''; }} />
        <button className="secondary" disabled={busy} onClick={() => input.current?.click()}><Camera size={17} />{busy ? 'Preparing picture…' : picture ? 'Change picture' : 'Add a picture'}</button>
        {picture && <button className="text-button" disabled={busy} onClick={() => { setPicture(''); setMessage(''); }}><Trash2 size={15} />Remove picture</button>}
        <small id="picture-help">JPEG, PNG or WebP · up to 5 MB.<br />Cropped to a square and compressed on your device. Nothing is uploaded.</small>
      </div>
      <div className="profile-about"><label htmlFor="profile-about">About me <span className="muted">· optional</span></label><textarea id="profile-about" maxLength={500} rows={5} value={about} aria-describedby="about-help" placeholder="A little about you, your interests, or the life you’re learning German for…" onChange={e => { setAbout(e.target.value); setMessage(''); }} /><small id="about-help">{about.length} / 500 characters · not a public bio</small><div className="form-actions"><button className="primary" disabled={busy || !changed} onClick={() => { setError(''); if (onSave({ picture, about: about.trim() })) { setAbout(about.trim()); setMessage('Profile saved in this browser.'); } else { setError('Your profile could not be saved. Browser storage may be full or unavailable. Your previous saved data is unchanged.'); } }}><Check size={17} />Save profile</button></div></div>
    </div>
    {error && <p className="error-text" role="alert">{error}</p>}<p className="profile-status" role="status">{message}</p>
  </section>;
}
