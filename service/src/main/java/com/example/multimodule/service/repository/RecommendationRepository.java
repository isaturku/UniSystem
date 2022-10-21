package com.example.multimodule.service.repository;

import com.example.multimodule.service.model.Recommendation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;


@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation,Integer> {
    List<Recommendation> findAllByUser_Username(String username);
    @Modifying
    @Transactional
    @Query("update Recommendation r set r.status =?1, r.reason =?2 where r.id=?3")
    public void changeStatus(String status, String reason , int id);
}
