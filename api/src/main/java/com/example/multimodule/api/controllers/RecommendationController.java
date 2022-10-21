package com.example.multimodule.api.controllers;

import com.example.multimodule.service.model.Recommendation;
import com.example.multimodule.service.model.RecommendationRequest;
import com.example.multimodule.service.repository.RecommendationRepository;
import com.example.multimodule.service.services.RecommendationService;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/recommendations")
public class RecommendationController {
    private final RecommendationService service;
    public RecommendationController(RecommendationService recommendationService) {
        this.service = recommendationService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_LIBRARIAN')")
    public List<Recommendation> getRecommendations(Pageable pageable){
        return service.getAllRecomendations(pageable);
    }
    @GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public List<Recommendation> getRecommendationsForUser(Principal principal,Pageable pageable){
        return service.getAllRecommendationsForUser(principal.getName());
    }
    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public void newRecommendation(Principal principal,@RequestBody RecommendationRequest request){
        service.insertRecommendation(request,principal.getName());
    }
    @PutMapping("/{rId}")
    @PreAuthorize("hasRole('ROLE_LIBRARIAN')")
    public void changeStatus(Principal principal,@RequestParam(name = "status",required = true)String status,@RequestParam(name = "reason",required = false)String reason, @PathVariable("rId") int rId ){
        service.changeStatusForID(status,reason,rId);
    }
}
