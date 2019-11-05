create table reg_location(
	id serial not null primary key,
	town text not null
);

create table reg_plates (
	id serial not null primary key,
	regnumber text not null,
	reg_id int,
	foreign key (reg_id) references reg_location(id)
);