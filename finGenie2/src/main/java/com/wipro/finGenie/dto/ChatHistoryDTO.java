package com.wipro.finGenie.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChatHistoryDTO {

    private Long chatId;

    @NotBlank(message = "User message cannot be empty")
    private String userMessage;

    private String botReply;

    private Long userId;
}
