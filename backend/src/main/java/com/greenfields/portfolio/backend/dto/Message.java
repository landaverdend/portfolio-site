package com.greenfields.portfolio.backend.dto;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Data;

enum Sender {
    CLIENT("client"),
    SERVER("server");

    private final String sender;

    // Constructor
    Sender(String sender) {
        this.sender = sender;
    }

    // Getter method
    @JsonValue
    public String getSender() {
        return sender;
    }
}

@Data
public class Message {
    String content;
    Sender sender;
}
