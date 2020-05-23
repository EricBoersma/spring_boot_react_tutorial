package com.example.boersma.realtimewebchat.message;

public class MessageFrame {
    public final Message body;
    public final String command;

    public MessageFrame(Message body, String command) {
        this.body = body;
        this.command = command;
    }
}
