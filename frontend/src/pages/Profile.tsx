import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; 
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const Profile = () => {

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      {user ? (
        <div className="profile-container bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>
          <div className="profile-info flex items-center justify-center flex-col md:flex-row">
            <div className="profile-image mb-4 md:mb-0">
              <Avatar >
                <AvatarImage
                  src={user.profileImage || '/default-profile.jpg'}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="rounded-full w-full h-full object-cover"
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl rounded-full p-5">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="profile-text text-center md:text-left ml-0 md:ml-4">
              <p className="text-lg"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">No user data available</p>
      )}
    </div>
  );
};

export default Profile;
