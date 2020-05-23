package com.example.boersma.realtimewebchat.message;

public class Message {
    private final String userName;
    private final String messageContent;

    public Message(String userName, String messageContent) {
        this.userName = userName;
        this.messageContent = messageContent;
    }

    /**
     * Gets the string content of the message
     * @return The message content
     */
    public String getMessageContent() {
        return messageContent;
    }

    /**
     * Gets the user's name as a string
     * @return the user name
     */
    public String getUserName() {
        return userName;
    }
}
