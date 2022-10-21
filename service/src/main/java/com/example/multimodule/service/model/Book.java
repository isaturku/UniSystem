package com.example.multimodule.service.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Entity
public class Book {
    @Id
    @Column(name = "id")
    private int id;
    private String olid;
    private String title;
    private String author;
    @ManyToMany(mappedBy = "borrowedBooks",fetch = FetchType.EAGER)
    @JsonIgnore
    List<User> borrowers = new ArrayList<User>();
    @OneToMany(mappedBy = "book",fetch = FetchType.EAGER)
    private List<Borrowing> borrowings;
    @Formula(value = "(SELECT NOT EXISTS(select * from borrowing bo where bo.book_id= id and bo.end_date>current_timestamp))")
    private boolean available;
    @Formula("(SELECT MAX(bo.end_date) from Borrowing bo where bo.id = id)")
    private Timestamp availableByDate;
    @Formula("(SELECT bo.user_id from Borrowing bo where bo.book_id = id and bo.end_date > current_timestamp and bo.start_date < current_timestamp)")
    private String currentBorrowerId;

    public Book(String olid, String title, String author,boolean available) {
        this.olid = olid;
        this.title = title;
        this.author = author;
        this.available = available;
    }

    public Book() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOlid() {
        return olid;
    }

    public void setOlid(String olid) {
        this.olid = olid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<User> getBorrowers() {
        return borrowers;
    }

    public void setBorrowers(List<User> borrowers) {
        this.borrowers = borrowers;
    }

    public boolean isAvailable() {
        return this.available;
    }
    public Timestamp getAvailableByDate(){
        return this.availableByDate;
    }

    public String getCurrentBorrowerId() {
        return currentBorrowerId;
    }
}
