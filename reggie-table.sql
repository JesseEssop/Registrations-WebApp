create table Reg_location(
	id serial not null primary key,
	town text not null
);

create table Reg_plates (
	id serial not null primary key,
	regnumber text not null,
	reg_id int,
	foreign key (reg_id) references Reg_location(id)
);