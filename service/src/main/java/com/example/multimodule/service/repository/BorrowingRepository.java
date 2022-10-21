package com.example.multimodule.service.repository;

import com.example.multimodule.service.model.Borrowing;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
public interface BorrowingRepository extends CrudRepository<Borrowing,Integer> {
    @Query("select b from Borrowing b where b.user.username = ?1 and b.endDate > current_timestamp and b.startDate < current_timestamp ")
    List<Borrowing> getBorrowingsByUsername(String username);
    @Query("select b from Borrowing b where b.user.username = ?1 and b.startDate > current_timestamp ")
    List<Borrowing> getShortlistingsByUsername(String username);
    @Query("select b from Borrowing b where b.user.username = ?1 and b.endDate < current_timestamp  ")
    List<Borrowing> getPreviousBorrowing(String username);
}
