package com.wipro.finGenie.service;

import java.util.List;

import com.wipro.finGenie.dto.ChatHistoryDTO;

public interface ChatHistoryService {

    List<ChatHistoryDTO> getAllChats();

    ChatHistoryDTO saveChat(ChatHistoryDTO dto);
}
