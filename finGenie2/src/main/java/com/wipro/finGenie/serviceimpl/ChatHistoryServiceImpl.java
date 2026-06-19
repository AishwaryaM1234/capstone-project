package com.wipro.finGenie.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wipro.finGenie.dto.ChatHistoryDTO;
import com.wipro.finGenie.entity.ChatHistory;
import com.wipro.finGenie.entity.User;
import com.wipro.finGenie.repository.ChatHistoryRepository;
import com.wipro.finGenie.repository.UserRepository;
import com.wipro.finGenie.service.ChatHistoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatHistoryServiceImpl implements ChatHistoryService {

    private final ChatHistoryRepository chatHistoryRepository;
    private final UserRepository userRepository;

    @Override
    public ChatHistoryDTO saveChat(ChatHistoryDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ChatHistory chatEntity = ChatHistory.builder()
                .userMessage(dto.getUserMessage())
                .botReply(dto.getBotReply())
                .user(user)
                .build();

        ChatHistory savedChat = chatHistoryRepository.save(chatEntity);

        dto.setChatId(savedChat.getChatId());

        return dto;
    }

    @Override
    public List<ChatHistoryDTO> getAllChats() {

        List<ChatHistory> chatList = chatHistoryRepository.findAll();

        return chatList.stream()
                .map(chat -> {
                    ChatHistoryDTO responseDto = new ChatHistoryDTO();
                    responseDto.setChatId(chat.getChatId());
                    responseDto.setUserMessage(chat.getUserMessage());
                    responseDto.setBotReply(chat.getBotReply());
                    responseDto.setUserId(chat.getUser().getUserId());
                    return responseDto;
                })
                .toList();
    }
}