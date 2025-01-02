import PropTypes from 'prop-types';
import Post from '../post/Post';
import './posts.css';
import placeholder from '../../assets/images/placeholder.jpg';

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post
          post={p}
          key={p._id}
          img={p.img ? `/images/${p.img}` : placeholder}
        />
      ))}
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      img: PropTypes.string,
    })
  ).isRequired,
};
