package com.example.multimodule.service.repository;

import com.example.multimodule.service.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {
    Page<Book> findAllByTitleContaining(String title, Pageable page);
    @Modifying
    @Transactional
    @Query("update Book b set b.olid = :olid where b.id = :id")
    void changeOLID(@Param("olid") String olid, @Param("id") int id);
}
