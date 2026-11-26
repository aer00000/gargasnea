import { useState } from 'react';

import styles from './ProfilePage.module.css';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
}

interface Post {
  id: string;
  image_url: string;
  caption: string | null;
  likes_count: number;
  comments_count: number;
}

const MOCK_PROFILE: Profile = {
  id: 'user-1',
  username: 'Galihäfv',
  full_name: 'Galileihoo Af Ugglas',
  location: 'Norrköping, Sweden',
  bio: 'Kungen i baren🍻\nAlltid redo för en kall.',
  avatar_url:
    'https://cdn.discordapp.com/attachments/1025047558244007996/1574782748877393920/Screenshot_20261113_113137_Gallery.jpg?ex=6b06e639&is=6b0594b9&hm=c407a17ee609c2d72c15ee99ee5cf168af3c2c309d79035842f318e5fd9961c5&'
};

const MOCK_POSTS: Post[] = Array.from({ length: 12 }, (_, i) => {
  const num = String(i + 1);
  return {
    id: `post-${num}`,
    image_url: `https://picsum.photos/seed/pubgolf-${num}/600/600`,
    caption: `Fett med en öl på pubgolfen #${num}`,
    likes_count: Math.floor(Math.random() * 200) + 10,
    comments_count: Math.floor(Math.random() * 30)
  };
});

export function ProfilePage() {
  const [isOwnProfile] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(340);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleToggleFollow = () => {
    setIsFollowing((prev) => !prev);
    setFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));
  };

  const visiblePosts = activeTab === 'posts' ? MOCK_POSTS : MOCK_POSTS.slice(0, 3);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <div className={styles.avatar}>
            {MOCK_PROFILE.avatar_url && (
              <img
                src={MOCK_PROFILE.avatar_url}
                alt={`${MOCK_PROFILE.username}s profilbild`}
              />
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.identity}>
            <h1 className={styles.username}>{MOCK_PROFILE.username}</h1>
            {MOCK_PROFILE.location && (
              <p className={styles.location}>{MOCK_PROFILE.location}</p>
            )}
          </div>

          {isOwnProfile ? (
            <button type="button" className={styles.btnSecondary}>
              Edit profile
            </button>
          ) : (
            <button
              type="button"
              className={isFollowing ? styles.btnSecondary : styles.btnPrimary}
              onClick={handleToggleFollow}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>

        <ul className={styles.stats}>
          <li>
            <strong>{MOCK_POSTS.length}</strong>
            <span>Rounds</span>
          </li>
          <li>
            <strong>{followers}</strong>
            <span>Followers</span>
          </li>
          <li>
            <strong>180</strong>
            <span>Following</span>
          </li>
        </ul>

        <div className={styles.bio}>
          {MOCK_PROFILE.bio && <p className={styles.bioText}>{MOCK_PROFILE.bio}</p>}
        </div>
      </header>

      <nav className={styles.tabs} aria-label="Profilsektioner">
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'posts' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Rounds
        </button>
        {isOwnProfile && (
          <button
            type="button"
            className={`${styles.tab} ${activeTab === 'saved' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved
          </button>
        )}
      </nav>

      <section className={styles.grid}>
        {visiblePosts.map((post) => (
          <button
            key={post.id}
            type="button"
            className={styles.tile}
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={post.image_url}
              alt={post.caption ?? 'Inlägg'}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.overlay}>
              <span>♥ {post.likes_count}</span>
              <span>💬 {post.comments_count}</span>
            </div>
          </button>
        ))}
      </section>

      {selectedPost && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedPost(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPost.image_url}
              alt={selectedPost.caption ?? 'Inläggsdetalj'}
              className={styles.modalImage}
            />
            <div className={styles.modalSidebar}>
              <div>
                <p className={styles.modalAuthor}>{MOCK_PROFILE.username}</p>
                {MOCK_PROFILE.location && (
                  <p className={styles.modalLocation}>{MOCK_PROFILE.location}</p>
                )}
                <p className={styles.modalCaption}>{selectedPost.caption}</p>
              </div>
              <div className={styles.modalFooter}>
                <span className={styles.likesLabel}>
                  ♥ {selectedPost.likes_count} Likes
                </span>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setSelectedPost(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProfilePage;
