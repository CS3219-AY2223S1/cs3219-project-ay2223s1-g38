import { SessionEvent } from "../constants/events.js";
import schedule from "node-schedule";
import { generateCronJobName } from "../utils/utils.js";
import { Milliseconds } from "../constants/types.js";
import { deleteRoomService } from "../service/collabService.js";

const leaveHandler = (io, socket) => {
    // Begins a cron job which will run in a certain amount of time to delete the session from database once the last user disconnects.
    const handleLeave = async () => {
        console.log("TEST");
        socket.rooms.forEach(room => {
            const numClientsInRoom = io.sockets.adapter.rooms.get(room).size;
            if (room !== socket.id && numClientsInRoom === 1) {
                const startTime = new Date(Date.now() + Milliseconds.IN_TEN_SECONDS);
                console.log("Schedule job");
                schedule.scheduleJob(generateCronJobName(room), startTime,
                () => {
                    console.log("GONNA delete room:", room);
                    deleteRoomService(room)
                });
            }
        })

    }

    socket.on(SessionEvent.LEAVE, handleLeave);
};

export default leaveHandler;