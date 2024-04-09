import Conversation from '../Models/conversation.model.js'

export const sendMessage = async (req,res) => {
    try {
           
            const {message} = req.body;
            const {id : receiverId} = req.params;
            const senderId = req.user._id;

            await Conversation.findOne({
                participants: message
            }) 

        } catch (error) {
            console.log("Error in sendMessage controller",error.message);
            res.status(500).json({error: "Error sending message"});
    }
}