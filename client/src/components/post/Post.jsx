import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './post.css';
import placeholder from '../../assets/images/placeholder.jpg';

export default function Post({ post, img = placeholder }) {
  const PF = 'http://localhost:5000/images/';
  return (
    <div className="post">
      <img
        className="postImg"
        src={post.photo ? `${PF}${post.photo}` : img}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, index) => (
            <span key={c._id || index} className="postCat">
              {c.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}

Post.propTypes = { post: PropTypes.object.isRequired, img: PropTypes.string };
