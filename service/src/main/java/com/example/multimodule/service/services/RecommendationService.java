package com.example.multimodule.service.services;

import com.example.multimodule.service.model.Recommendation;
import com.example.multimodule.service.model.RecommendationRequest;
import com.example.multimodule.service.repository.RecommendationRepository;
import com.google.gson.Gson;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {
    private final RecommendationRepository repo;
    private final UserService service;

    public RecommendationService(RecommendationRepository repo, UserService service) {
        this.repo = repo;
        this.service = service;
    }

    public List<Recommendation> getAllRecomendations(Pageable pageable){
        if(pageable != null)
            return repo.findAll(pageable).get().toList();
        else
            return repo.findAll();
    }
    public List<Recommendation> getAllRecommendationsForUser(String username){
        return repo.findAllByUser_Username(username);
    }
    public void insertRecommendation(RecommendationRequest request,String username){
        Recommendation recommendation = new Recommendation();
        recommendation.setAuthor(request.author());
        recommendation.setTitle(request.title());
        recommendation.setOlid(request.olid());
        recommendation.setUser(service.getUserByUsename(username));
        repo.saveAndFlush(recommendation);
    }
    public void changeStatusForID(String status,String reason, int id){
        repo.changeStatus(status,reason,id);
    }
}
