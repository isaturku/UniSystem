package com.example.multimodule.service.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "user")
public class User {
    @Id
    private String username;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String password;
    @Column(name = "user_role")
    private String role;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Borrowing> loans;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "borrowing",
    joinColumns = @JoinColumn(name = "user_id",referencedColumnName = "username"),
    inverseJoinColumns = @JoinColumn(name = "book_id",referencedColumnName = "id"))
    @JsonIgnore
    private List<Book> borrowedBooks = new ArrayList<Book>();
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Recommendation> recommendations;

    public User(String username, String firstName, String lastName, String password,String role) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
    }

    public User() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Book> getBorrowedBooks() {
        return borrowedBooks;
    }

    public void setBorrowedBooks(List<Book> borrowedBooks) {
        this.borrowedBooks = borrowedBooks;
    }
}
