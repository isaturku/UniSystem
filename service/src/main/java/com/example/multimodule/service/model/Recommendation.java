package com.example.multimodule.service.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.enterprise.inject.Default;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.ws.rs.DefaultValue;

@Entity
public class Recommendation {
    @Id
    private int id;
    private String olid;
    @ManyToOne()
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    private String title;
    private String author;
    private String status;
    private String reason;

    public Recommendation() {
    }

    public Recommendation(int id, String olid, User user, String title, String author, String status, String reason) {
        this.id = id;
        this.olid = olid;
        this.user = user;
        this.title = title;
        this.author = author;
        this.status = status;
        this.reason = reason;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
