export const maskedEmail = (email) => {

    const [userStand, defaultStand] = email?.split("@");

    const initial = userStand.slice(0, 3);
    const hidingPart = "x".repeat(userStand.length - 3);

    return `${initial}${hidingPart}@${defaultStand}`;

}

export const formateTime = (timer) => {

    const min = Math.floor(timer / 60).toString().padStart(2, 0);
    const sec = Math.floor(timer % 60).toString().padStart(2, 0);

    return `${min}:${sec}`;

}