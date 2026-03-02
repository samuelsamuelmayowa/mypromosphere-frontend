export default function TimeEdit(time){
    const isUTC = time.endsWith('Z');
    let commentDate;
    if (isUTC) {
        commentDate = new Date(time);
    } else {
        commentDate = new Date(time + 'Z');
    }
    const now = new Date();
    const diffInSecs = (now - commentDate) / 1000;
    const diffInMins = diffInSecs / 60;
    const diffInHours = diffInMins / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30;
    const diffInYears = diffInDays / 365;


    let timeAgo;
    if (diffInYears >= 1) {
        timeAgo = `${Math.floor(diffInYears)} year${Math.floor(diffInYears) > 1 ? 's' : ''} ago`;
    } else if (diffInMonths >= 1) {
        timeAgo = `${Math.floor(diffInMonths)} month${Math.floor(diffInMonths) > 1 ? 's' : ''} ago`;
    } else if (diffInDays >= 1) {
        timeAgo = `${Math.floor(diffInDays)} day${Math.floor(diffInDays) > 1 ? 's' : ''} ago`;
    } else if (diffInHours >= 1) {
        timeAgo = `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) > 1 ? 's' : ''} ago`;
    } else if (diffInMins >= 1) {
        timeAgo = `${Math.floor(diffInMins)} minute${Math.floor(diffInMins) > 1 ? 's' : ''} ago`;
    } else {
        timeAgo = `${Math.floor(diffInSecs)} second${Math.floor(diffInSecs) > 1 ? 's' : ''} ago`;
    }
    return timeAgo;
}