\c miru_db;

INSERT INTO activity (name,description,street_address,city,state,zip_code,category) VALUES
('The Vessel','Starting with NYC’s newest attraction, The Vessel! Located in the Hudson Yards, the Vessel is easily one of the best free things to do during your visit to NYC.','20 Hudson Yards','NY','NY',10001,'Sightseeing'),
('The Highline','Make your way to the Chelsea Highline. This iconic railway turned greenway is one of my all-time favorite places to visit, especially on a nice sunny day!','-','NY','NY',10011,'Sightseeing'),
('Central Park','Central Park is a staple for NYC and luckily for all of us, it’s among one of the many free things to do!','3234 5th Ave','NY','NY',10075,'Parks');

INSERT INTO comments (activity_id,name,comment) VALUES 
(1, 'Rose','I don’t like this place. Way too many tourists'),
(2, 'Younes','Never been, but definitely on my to do list'),
(3, 'JJ','I love it. It’s super relaxing, especially if you find the nooks and craanies'),
(3, 'Sev','People watching is the best here and free!');