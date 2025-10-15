import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ActivityDTO, CreateActivityDTO, EventManagementService } from '../event-management.service';

@Component({
  selector: 'app-event-activities',
  templateUrl: './activity-component.html',
  styleUrls: ['./activity-component.css']
})
export class ActivityComponent implements OnInit {
  @Input() eventId!: number;
  activities: ActivityDTO[] = [];
  activityForm!: FormGroup;

  constructor(private activityService: EventManagementService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadActivities();

    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['']
    });
  }

  loadActivities() {
    this.activityService.getActivities(this.eventId).subscribe(data => {
      this.activities = data;
    });
  }

  onSubmit() {
    if (this.activityForm.valid) {
      const dto: CreateActivityDTO = this.activityForm.value;
      this.activities.push({
        id: Math.floor(Math.random() * 100000),
        ...dto
      });
      this.activityForm.reset();
    }
  }

  generatePDF() {
    const doc = new jsPDF();

    doc.text('Event Activities', 14, 20);

    const tableColumn = ['Name', 'Description', 'Start Time', 'End Time', 'Location'];
    const tableRows: any[] = [];

    this.activities.forEach(activity => {
      const activityData = [
        activity.name,
        activity.description,
        activity.startTime,
        activity.endTime,
        activity.location
      ];
      tableRows.push(activityData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30
    });

    doc.save('activities.pdf');
  }
}
