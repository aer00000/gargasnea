import { useEffect, useState } from 'react';

import { supabase } from '../supabaseClient';
import styles from './FirebaseExample.module.css';

interface Student {
  id: string;
  name: string;
  grade: string;
}

export default function SupabaseExample() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 1. Write data
  async function addStudent() {
    if (!name) {
      return;
    }
    try {
      const { error: insertError } = await supabase
        .from('students')
        .insert([{ name, grade: 'A+' }]);

      if (insertError) {
        throw insertError;
      }
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to write to the database.');
    }
  }

  // 2. Read data and subscribe to real-time changes
  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error: fetchError } = await supabase.from('students').select('*');

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setStudents(data);
        setError(null);
      }
    };

    void fetchStudents();

    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
        void fetchStudents();
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className={styles.studentDemo}>
      <div className={styles.studentForm}>
        <label htmlFor="student-name" className={styles.visuallyHidden}>
          Student name
        </label>
        <input
          id="student-name"
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              void addStudent();
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            void addStudent();
          }}
        >
          Add
        </button>
      </div>

      {error && <p className={styles.studentError}>{error}</p>}

      {students.length === 0 ? (
        <p className={styles.studentEmpty}>No students yet - add one above.</p>
      ) : (
        <ul className={styles.studentList}>
          {students.map((student) => (
            <li key={student.id} className={styles.studentListItem}>
              <span>{student.name}</span>
              <span className={styles.studentGrade}>{student.grade}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
