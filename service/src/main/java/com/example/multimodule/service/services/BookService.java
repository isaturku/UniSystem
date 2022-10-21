package com.example.multimodule.service.services;

import com.example.multimodule.service.model.Book;
import com.example.multimodule.service.repository.BookRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;

@Service
@Log4j2
public class BookService {
    private final BookRepository repo;

    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    public void insertBook(String olid, String title, String author, boolean available){
        repo.saveAndFlush(new Book(olid,title,author,available));
    }
    public Book getBookById(int id){
        return repo.findById(id).get();
    }
    public boolean checkAvailableById(int id){
        return getBookById(id).isAvailable();
    }
    public Timestamp getAvailableByDateById(int id){return getBookById(id).getAvailableByDate();}
    public List<Book> getBooks(Pageable pageable){
        if (pageable != null){
            log.info("pageable found");
            log.info(pageable.getPageNumber());
            log.info(pageable.getPageSize());
            return repo.findAll(pageable).get().toList();
        }else {
            log.info("pageable null");
            return repo.findAll();
        }
    }
    public int getCount(){
        return repo.findAll().size();
    }
}
