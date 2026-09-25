import './assets/robot.png'
import UserProfileImage  from './assets/user.png';
import RobotProfileImage  from './assets/robot.png';
export function ChatMessage({ message, sender }) {
    return (
      <div
        className={
          sender === 'user' ? 'User-ChatMessage' : 'Robot-ChatMessage'
        }
      >
        {sender === 'robot' && (
          <img
            src={RobotProfileImage}
            width="45px"
          />
        )}
        <div className="ChatMessage-text">{message}</div>
        {sender === 'user' && (
          <img
            src={UserProfileImage}
            width="45px"
          />
        )}
      </div>
    );
  }